import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/**
 * 返回url参数的键值形式
 * @param keys 
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {

  // searchParams是useSearchParams返回的一个state
  // 其形式为map的形式，例如[['name', '123'], ['id', '456']]
  const [searchParams, setSearchParam] = useSearchParams()
  
  return [

    // hook坑：使用非state作为依赖项会造成无限渲染的问题
    // 所以需要使用useMemo来限定非state数据，useMemo的第二个而参数是依赖项
    // 当依赖项改变时执行第一个参数的函数
    useMemo(
      () => keys.reduce((prev, key) => {

        // 默认key是字符串，[key]表示key是变量
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParam(o)
    }
    
    // as const解决元组中类型不一致导致ts类型推断错误的问题
  ] as const
}