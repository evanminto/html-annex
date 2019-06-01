# HTML Annex

HTML Annex is a collection of Web Components for common UI design patterns,
implemented according to strict principles of accessibility and progressive
enhancement. Components are small and minimally styled to make them as easy as
possible to integrate into a variety of projects.

If built-in HTML elements are the house, HTML Annex is the annex built alongside
it, extending it with additional functionality not covered in the original design.

**NOTE:** This project is currently a work-in-progress and is not yet suitable
for production use.

## Documentation

Coming soon! I’ll probably put it on a separate site so I can document usage for
each component on its own page.

## Principles

All components are built with the following principles in mind:
* **Progressive enhancement:** Web user experiences experiences should be usable even when JavaScript doesn’t
  load.
* **Inclusion:** Users should be able to access equivalent experiences
  regardless of their disability, social or economic status, or identity. All
  components should meet WCAG AAA criteria.
* **Performance:** Components should respect users’ time and bandwidth limitations by
  delivering maximum utility with minimal file size.
* **Options**: Components should have options for customizing behavior, and it
  should be easy to style them to match the elements around them.
* **Platform consistency:** Whenever possible, components’ behaviors and APIs
  should be consistent with their equivalents for built-in elements and APIs.

## Questions You Were About to Ask

### Is this a design system?

Nope. HTML Annex is intended as a toolkit for people building websites, web
apps, and design systems. It features minimal styling intended to match user
agent styles as much as possible, so you are free to customize components for your own use cases.

### Will these components work with my React/Vue/Angular project?

Yes! The components are built using Web Components, a set of relatively new Web
platform standards (including Custom Elements and Shadow DOM) that are supported
in Chrome, Safari, Firefox, Samsung Internet, Opera, and more. Because these
standards are built into the browser, Web Components should work with all major
frameworks. They’re basically just like regular HTML elements!
