import { useAsync } from "utils/use-async";
import { cleanObject } from "utils";
import { useEffect } from "react"
import { useHtpp } from "utils/http";
import { User } from "screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const client = useHtpp();
  const { run, ...res } = useAsync<User[]>();
  useEffect(() => {
    run(client('users', { data: cleanObject(param || {}) }))
  }, [param]);

  return res;
}