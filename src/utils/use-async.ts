import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' |  'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig}
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) => {
    console.log('setData', data)
    return setState({
      data,
      stat: 'success',
      error: null
    })
  }

  const setError = (error: Error) => setState({
    data: null,
    stat: 'error',
    error
  })

  // run用来触发异步请求
  const run = async (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据');
    }
    await setState({...state, stat: 'loading'});
    return promise
      .then(data => {
        setData(data);
        return data;
      })
      .catch(error => {

        // catch会消化异常，如果不主动抛出，外部无法接收run函数的的异常
        // setError是异步操作
        setError(error);
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      })
  }
  return {
    run,
    setData,
    setError,
    ...state,
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
  }
}
