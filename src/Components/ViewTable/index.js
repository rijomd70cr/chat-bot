import React, { useState, useEffect } from "react"
import { extractHeaders, resetHeaderOrder } from "./method";

export default function ViewTable({ data, hideColumns = [], reOrder = [], changeData = [] }) {

    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        setHeaders(
            resetHeaderOrder(
                extractHeaders(data, hideColumns, changeData),
                reOrder
            )
        )
    }, [])

    return (
        <div style={{ textAlign: 'left' }}>
            <table>
                <tbody>
                    {headers.map((value, index) => {
                        return (
                            <tr key={index}>
                                <th>{value.key}</th>
                                <td>: {value.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}