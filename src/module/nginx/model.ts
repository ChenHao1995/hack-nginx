import { Model, Collection } from 'backbone-react'
import { parse } from 'url'

// interface userInfo {
//   [key: string]: any
//   /** 姓名 */
//   name: string
//   /** 年龄 */
//   age?: number
// }

export class Nginx extends Model {
  attributes = this.attributes

  get idAttribute() {
    return 'key'
  }

  deleteNginxNode = ({ ip, port, name }) => {
    return axios({
      method: 'delete',
      url: 'http://api-doc.fiiish.cn/mock/326/api/v1/nginx/upstreams/{upstream_name}/delete_node'.replace(
        /{upstream_name}/,
        name
      ),
      data: {
        port,
        ip,
      },
    }).then(data => {
      console.log(data)
      return data
    })
  }
  defaults() {
    return {}
  }
}

export class Nginxs extends Collection {
  model = Nginx
  url = 'http://api-doc.fiiish.cn/mock/326/api/v1/nginx/upstreams'
  parse(data) {
    data = data.data.data
    const result: any = []
    data.forEach((v, i) => {
      let first = true
      v.upstream_nodes.forEach((value, index) => {
        result.push({
          key: `${i}-${index}`,
          name: v.name,
          nameRowSpan: first ? v.upstream_nodes.length : 0,
          ...value,
        })
        first = false
      })
    })
    return result
  }

  getNginxList = () => {
    this.fetch()
      .then(data => {
        console.log(data)
      })
      .catch(data => {
        console.log(data)
      })
  }
}

export default new Nginxs()
