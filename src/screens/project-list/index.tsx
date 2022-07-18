import { useEffect, useState } from "react"
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce, useMount } from "../../utils";
import * as qs from "qs"
import { useHtpp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 2000);
  const [list, setList] = useState([])
  const client = useHtpp();
  useEffect(() => {
    client('projects', {data:cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam])

  // 只需要在页面渲染的时候触发一次
  useMount(() => {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async response => {
    //   if (response.ok) {
    //     setUsers(await response.json())
    //   }
    // })
  })

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </Container> 
}

const Container = styled.div`
  padding: 3.2rem;
`