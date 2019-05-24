/**
 * Module dependencies.
 */

const program = require('commander')
const inquirer = require('inquirer')
const _ = require('underscore')
const fs = require('fs-extra')
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

program
  .version('0.1.0', '-v, --version')
  .command('add')
  .option('-m,--module', '添加业务模块')
  .action(function(name, cmd) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'moduleName',
          message: '请输入模块目录名',
          validate(moduleName) {
            const done = this.async()
            const modules = fs.readdirSync(resolve('../src/module'))
            if (modules.indexOf(moduleName) > -1) {
              done('已存在' + moduleName + '模块，请重新命名')
            } else {
              done(null, true)
            }
          },
        },
        {
          type: 'input',
          name: 'collectionName',
          message:
            '请输入 Collection 名称，必须为复数，以 s 结尾。如视图不需要关联数据模型，则不用输入',
          validate: function(collectionName) {
            const done = this.async()
            if (collectionName === '') {
              done(null, true)
              return
            }
            if (collectionName[collectionName.length - 1] !== 's') {
              done('必须为复数，以 s 结尾')
              return
            }
            done(null, true)
          },
        },
      ])
      .then(data => {
        const { collectionName, moduleName } = data
        // 去掉末尾的s，获得 Model 名
        const modelName = collectionName.substring(0, collectionName.length - 1)
        const mapping = {
          // Model Collection 命名： 大驼峰
          store: parseStringfunc.camel(modelName),
          Store: parseStringfunc.camel(modelName, true),
          // 模块路由和路由钩子等：小驼峰
          temp: parseStringfunc.camel(moduleName),
          // 组件名称：大驼峰
          Temp: parseStringfunc.camel(moduleName, true),
        }

        if (!collectionName) {
          delete mapping.store
          delete mapping.Store
        }

        // 创建新模块目录
        const newModulePath = resolve('../src/module/' + moduleName)
        fs.mkdirSync(newModulePath)
        fs.copySync(resolve('../src/module/_temp'), newModulePath)
        if (!collectionName) {
          fs.removeSync(newModulePath + '/model.ts')
        }

        // 正则变量替换
        const regStr = _.map(mapping, (v, k) => k).join('|')
        const regex = new RegExp(`(${regStr})`, 'g')
        readDirFiles(newModulePath, file => {
          const content = fs.readFileSync(file).toString()
          let newContent = content.replace(regex, str => mapping[str])
          if (!collectionName) {
            newContent = removeViewModel(newContent)
          }
          fs.writeFileSync(file, newContent)
        })
        // 挂载新模块的路由
        const routeConfig = require('../src/router/config.json')
        routeConfig.modules.unshift(moduleName)
        fs.writeFileSync(
          resolve('../src/router/config.json'),
          JSON.stringify(routeConfig, null, 2)
        )
        console.log('创建成功！')
      })
  })

program.parse(process.argv)

/**
 * 处理字符串的工具
 */
const parseStringfunc = {
  //转为下划线：func.underline('userRole',true) => USER_ROLE
  //转为下划线：func.underline('userRole',false) => user_role
  underline: function(str, upper) {
    const ret = str.replace(/([A-Z])/g, '_$1')
    if (upper) {
      return ret.toUpperCase()
    } else {
      return ret.toLowerCase()
    }
  },
  //转驼峰表示：func.camel('user-name',true) => UserName
  //转驼峰表示：func.camel('user-name',false) => userName
  camel: function(str, firstUpper) {
    let ret = str.toLowerCase()
    ret = ret.replace(/-([\w+])/g, function(all, letter) {
      return letter.toUpperCase()
    })
    if (firstUpper) {
      ret = ret.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2
      })
    }
    return ret
  },
}

function removeViewModel(str) {
  str = str.replace("import { inject, observer } from 'backbone-react'\n", '')
  str = str.replace("import stores from './model'\n", '')
  str = str.replace('@inject({ stores })\n@observer\n', '')
  return str
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function readDirFiles(filePath, callback) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败')
          } else {
            const isFile = stats.isFile() //是文件
            const isDir = stats.isDirectory() //是文件夹
            if (isFile) {
              callback(filedir)
            }
            if (isDir) {
              readDirFiles(filedir, callback) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}
