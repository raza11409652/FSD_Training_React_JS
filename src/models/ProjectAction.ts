type ProjectAction =
    {type: "ROWS_DATA", payload: any} |
    {type: "PROJ_FORM", payload: any} |
    {type: "UPDATE_FORM", payload: any} |
    {type: "PROJECT_DATA", payload: any} |
    {type: "DELETE_FORM", payload: any} |
    {type: "DELETE_ID", payload: any} |
    {type: "PROJECT_COLUMNS", payload: any}

export type { ProjectAction }