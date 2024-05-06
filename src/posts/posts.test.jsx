import { describe, test, expect } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "./posts";

const fakePosts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
];

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    return res(ctx.json(fakePosts));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<Home/>", () => {
  test("loading", async () => {
    render(<Home />);
    expect(screen.getByTitle("loading")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));
    expect(screen.queryByText(/there are no posts/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("fetch data", async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));
    expect(screen.getAllByRole("post")).toHaveLength(fakePosts.length);

    fakePosts.forEach((post) => {
      expect(
        screen.getByRole("heading", { level: 1, name: post.title })
      ).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });

  test("error handling", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts",
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.queryByText(/there are no posts/i)).not.toBeInTheDocument();
  });

  test("no posts", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts",
        (req, res, ctx) => {
          return res(ctx.json([]));
        }
      )
    );
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.getByTitle("loading"));
    expect(screen.getByText(/there are no posts/i)).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
