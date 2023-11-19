import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h1 className={`text-2xl font-semibold text-white/90 transition-colors hover:text-white`} {...props} />,
    h2: (props) => <h2 className={`text-xl font-semibold text-white/90 transition-colors hover:text-white !mt-12`} {...props} />,
    h3: (props) => <h3 className={`text-lg font-semibold text-white/80 transition-colors hover:text-white !mt-8`} {...props} />,
    p: (props) => <p className={`text-white/60`} {...props} />,
    a: (props) => <a className={`text-white/70 underline transition-colors hover:text-white`} {...props} />,
  }
}
