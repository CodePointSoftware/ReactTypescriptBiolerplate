import * as React from "react";
import { shallow } from "enzyme";

import Hello from "../Hello";

it("renders the heading", () => {
  const component = shallow(<Hello />);
  expect(component).toMatchSnapshot();
});
