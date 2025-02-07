import {
  ImageListContext_default
} from "./chunk-Y5AW5NUQ.js";
import {
  isMuiElement_default
} from "./chunk-DCIZPUL3.js";
import {
  useDefaultProps
} from "./chunk-L4U2OAAU.js";
import {
  styled_default
} from "./chunk-3WM756Q3.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  integerPropType_default,
  require_react_is
} from "./chunk-3Y3WJPKK.js";
import {
  require_jsx_runtime
} from "./chunk-X5OZNLGX.js";
import {
  require_prop_types
} from "./chunk-ZM6LQ52J.js";
import {
  require_react
} from "./chunk-5OUPSW2S.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/material/ImageListItem/ImageListItem.js
var import_prop_types = __toESM(require_prop_types());
var React = __toESM(require_react());
var import_react_is = __toESM(require_react_is());

// node_modules/@mui/material/ImageListItem/imageListItemClasses.js
function getImageListItemUtilityClass(slot) {
  return generateUtilityClass("MuiImageListItem", slot);
}
var imageListItemClasses = generateUtilityClasses("MuiImageListItem", ["root", "img", "standard", "woven", "masonry", "quilted"]);
var imageListItemClasses_default = imageListItemClasses;

// node_modules/@mui/material/ImageListItem/ImageListItem.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    variant
  } = ownerState;
  const slots = {
    root: ["root", variant],
    img: ["img"]
  };
  return composeClasses(slots, getImageListItemUtilityClass, classes);
};
var ImageListItemRoot = styled_default("li", {
  name: "MuiImageListItem",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${imageListItemClasses_default.img}`]: styles.img
    }, styles.root, styles[ownerState.variant]];
  }
})({
  display: "block",
  position: "relative",
  [`& .${imageListItemClasses_default.img}`]: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    display: "block"
  },
  variants: [{
    props: {
      variant: "standard"
    },
    style: {
      // For titlebar under list item
      display: "flex",
      flexDirection: "column"
    }
  }, {
    props: {
      variant: "woven"
    },
    style: {
      height: "100%",
      alignSelf: "center",
      "&:nth-of-type(even)": {
        height: "70%"
      }
    }
  }, {
    props: {
      variant: "standard"
    },
    style: {
      [`& .${imageListItemClasses_default.img}`]: {
        height: "auto",
        flexGrow: 1
      }
    }
  }]
});
var ImageListItem = React.forwardRef(function ImageListItem2(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: "MuiImageListItem"
  });
  const {
    children,
    className,
    cols = 1,
    component = "li",
    rows = 1,
    style,
    ...other
  } = props;
  const {
    rowHeight = "auto",
    gap,
    variant
  } = React.useContext(ImageListContext_default);
  let height = "auto";
  if (variant === "woven") {
    height = void 0;
  } else if (rowHeight !== "auto") {
    height = rowHeight * rows + gap * (rows - 1);
  }
  const ownerState = {
    ...props,
    cols,
    component,
    gap,
    rowHeight,
    rows,
    variant
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(ImageListItemRoot, {
    as: component,
    className: clsx_default(classes.root, classes[variant], className),
    ref,
    style: {
      height,
      gridColumnEnd: variant !== "masonry" ? `span ${cols}` : void 0,
      gridRowEnd: variant !== "masonry" ? `span ${rows}` : void 0,
      marginBottom: variant === "masonry" ? gap : void 0,
      breakInside: variant === "masonry" ? "avoid" : void 0,
      ...style
    },
    ownerState,
    ...other,
    children: React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      if (true) {
        if ((0, import_react_is.isFragment)(child)) {
          console.error(["MUI: The ImageListItem component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join("\n"));
        }
      }
      if (child.type === "img" || isMuiElement_default(child, ["Image"])) {
        return React.cloneElement(child, {
          className: clsx_default(classes.img, child.props.className)
        });
      }
      return child;
    })
  });
});
true ? ImageListItem.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `<img>`.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: integerPropType_default,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows: integerPropType_default,
  /**
   * @ignore
   */
  style: import_prop_types.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var ImageListItem_default = ImageListItem;

export {
  getImageListItemUtilityClass,
  imageListItemClasses_default,
  ImageListItem_default
};
//# sourceMappingURL=chunk-2X77BWD2.js.map
