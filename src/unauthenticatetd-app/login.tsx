import { useAuth } from "context/auth-context"
import { Form, Input } from "antd";
import { LongButton } from "unauthenticatetd-app";
import { useAsync } from "utils/use-async";

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, {throwOnError: true})

  const handleSubmit = async (values: { username: string, password: string }) => {
    // useState的set操作是异步的，
    // 不能用useAsync里面的error是因为这里会发生同步异步代码混用，
    // eventloop机制会导致同步代码先执行，异步代码后执行
    try {
      await run(login(values))
    } catch (e) {
      onError(e as Error);
    }
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder={'用户名'} type="text" id={'username'} />
    </Form.Item>
    <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
      <Input placeholder={'密码'} type="password" id={'password'} />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
} 