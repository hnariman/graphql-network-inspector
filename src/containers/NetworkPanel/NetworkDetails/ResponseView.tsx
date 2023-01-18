import { useMemo } from "react"
import * as safeJson from "../../../helpers/safeJson"
import { JsonView } from "@/components/CodeView"
import { CopyButton } from "../../../components/CopyButton"

interface IResponseViewProps {
  response?: string
  collapsed?: number
}

const searchFilter = (data: string | {}) => {
  //TODO: get serch regex from Toolbar component here;
  return data;
}

export const ResponseView = (props: IResponseViewProps) => {
  const { response, collapsed } = props
  const { formattedJson, parsedResponse } = useMemo(() => {
    const parsedResponse = safeJson.parse(response) || {}
    const filteredResponse = searchFilter(parsedResponse);
    return {
      formattedJson: safeJson.stringify(parsedResponse, undefined, 2),
      parsedResponse,
    }
  }, [response])

  return (
    <div className="relative p-4">
      <CopyButton
        textToCopy={formattedJson}
        className="absolute right-3 top-3 z-10"
      />
      <JsonView src={parsedResponse} collapsed={collapsed} />
    </div>
  )
}
