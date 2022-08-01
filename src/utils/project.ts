import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { cleanObject, useDebounce, useMount } from "utils";
import { useEffect, useState } from "react"
import { useHtpp } from "utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHtpp();
  const { run, ...res } = useAsync<Project[]>();
  useEffect(() => {
    // console.log('param', param)
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param]);

  // console.log('useProjects', res)
  return res;
}