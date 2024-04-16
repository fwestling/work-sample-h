import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
	test("renders app", async () => {
		render(<App />);
		expect(
			screen.getByRole("heading", { name: "Hatch: Move within the hierarchy" }),
		).toBeInTheDocument();
	});

	test("renders organisation", async () => {
		render(<App />);
		expect(
			screen.getByRole("heading", { name: "Dunder Mifflin" }),
		).toBeInTheDocument();
	});
});
