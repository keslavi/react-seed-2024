import { isValidElement } from "react";
import { toast } from "react-toastify";

const jsxToString = (node) => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(jsxToString).join('');
  if (isValidElement(node)) {
    return jsxToString(node.props.children);
  }
  return String(node);
}

const infraToast = (jsxOrMsg) => {
  toast(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: "#1f2937"
      }}
    >
      <strong>Hey Developer!</strong>
      <div style={{ marginTop: 8 }}>
        {isValidElement(jsxOrMsg) ? jsxOrMsg : String(jsxOrMsg)}
      </div>

    </div>,
    {
      toastId: jsxToString(jsxOrMsg),
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      style:{
        backdropColor:"#fb923c",
        border:"1px solid #f97316",
      },
      progressStyle:{
        background:"#ea580c"
      },
      icon:false,
    }
  )
}

/**
 * @param {string | JSX.Element} jsxOrMsg
 */
export const infraWarn=(jsxOrMsg) => {
  switch(true){
    case env.isDev:
    case env.isLocal:
      infraToast(jsxOrMsg);
      return;
    default:
      console.warn("[INFRASTRUCTURE WARNING]", jsxOrMsg);
  }
}