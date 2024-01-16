declare module '*.svg' {
  const content: (props: JSX.IntrinsicElements['svg']) => JSX.Element
  export default content
}
