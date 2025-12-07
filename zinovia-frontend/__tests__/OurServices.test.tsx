import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import OurServices, { servicesContent } from "../components/OurServices";

test("OurServices renders heading and links for each service", () => {
  const html = renderToStaticMarkup(<OurServices />);

  assert.ok(html.includes("Our Services"), "heading should be rendered");

  servicesContent.forEach((service) => {
    assert.ok(
      html.includes(service.title),
      `service title "${service.title}" should be rendered`
    );
    assert.ok(
      html.includes(`href="${service.href}"`),
      `service link "${service.href}" should be present`
    );
  });
});


