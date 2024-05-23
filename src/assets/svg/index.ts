const svgModules = import.meta.glob('./*.svg')

const svgs: { [key: string]: string } = {}

for (const path in svgModules) {
  const svgName = path.split('/').pop()?.replace('.svg', '') || ''
  svgs[svgName] = await (svgModules as any)[path]()
}

export default svgs
