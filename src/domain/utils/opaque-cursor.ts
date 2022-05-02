

export const encode = (cursor: string)  => {
    return Buffer.from(cursor).toString("base64")
}

export const decode = (cursor: string) => {
    return Buffer.from(cursor, "base64").toString("ascii")
}
