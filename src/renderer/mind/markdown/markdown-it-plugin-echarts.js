export default (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    if (token.info === 'echarts') {
      const code = token.content.replace(/[\r\n\s+]/g, '').trim();
      
      try {
      //  const json = JSON.parse(code);
        const json=eval("("+code+")");
        const width = json.chartWidth || 500
        const height = json.chartHeight || 400
        return `<div style="width:${width}px;height:${height}px" class="md-echarts" isRender=0''>${JSON.stringify(json)}</div>`
      } catch (e) { // JSON.parse exception
        return `<pre>${e}</pre>`
      }
    }
    return temp(tokens, idx, options, env, slf)
  }
}
