const defaults = {
  title: 'Carlos Pinzón',
  favicon: 'static/icons/icon.png',
}

export default function (props?: { favicon?: string, title?: string }) {
  const { favicon, title } = { ...defaults, ...props };
  return <>
    {favicon && <link rel="icon" type="image/x-icon" href={favicon} />}
    {title && <title>{title}</title>}
  </>
}