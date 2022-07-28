import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value;

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

export const cleanObject = (object: {[key: string]: unknown }) => {
  // Object.assign({}, object)
  const res = {...object}
  Object.keys(res).forEach((key: string) => {
    const value = res[key]
    if (isVoid(value)) {
      delete res[key]
    }
  })
  return res;
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // param每次变化都会执行useEffect
  // 设置一个定时器用于更新param的值，且每次都会清理上一个定时器
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // useEffect清除函数的特性
    // 所以下一个useEffect运行前会清除上一个useEffect，
    // 从而清除上一个定时器
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])
  return debouncedValue
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时：oldTitle === 旧title Jira任务管理系统
  // 加载后：oldTitle === 新title（即参数title）

  useEffect(() => {
    document.title = title;
  }, [title])


  // 由于hook中闭包的关系，使用useEffect hook不指定依赖，
  // 当页面加载时，useEffect执行，那么调用的值依然是初始值
  // 解决方式为指定依赖，让hook闭包可以追踪到变化
  useEffect(() => {

    // 页面卸载的时候调用
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的还是旧title
        document.title = oldTitle;
      }
    }
  }, [keepOnUnmount, oldTitle])
}