import { useState } from "react"
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Typography } from "antd";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // 基本类型和state可以作为hook的依赖项，其他数据不可以，会造成无限渲染的问题
  // const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 2000);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  // console.log('list', list)
  const {data:users} = useUsers()

  // useDocumentTitle('项目列表', false)

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam}/>
    {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
    <List loading={isLoading} users={users || []} dataSource={list || []} />
  </Container> 
}

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`