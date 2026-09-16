import { describe, expect, it } from "vitest";
import { parseGithubAccounts } from "./host";

describe("parseGithubAccounts", () => {
  it("returns the active successful account for every authenticated host", () => {
    expect(
      parseGithubAccounts({
        hosts: {
          "github.rbx.com": [
            { state: "success", active: true, login: "zhenzhang" },
            { state: "success", active: false, login: "other" },
          ],
          "github.com": [{ state: "success", active: true, login: "tensorcopy" }],
          "broken.example": [{ state: "failed", active: true, login: "broken" }],
        },
      }),
    ).toEqual([
      { hostname: "github.com", login: "tensorcopy" },
      { hostname: "github.rbx.com", login: "zhenzhang" },
    ]);
  });
});
