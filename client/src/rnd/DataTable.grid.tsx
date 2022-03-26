import React, {ReactElement, useEffect, useState} from 'react'
import {Button, Form, FormControl, InputGroup, Pagination, Table} from "react-bootstrap";


interface Props {
    result: any;
    GridCustomHeader: any;
    GridCustomContent: any;
    onSelectedItemAction: any;
}

export default function DataTableGrid({result, GridCustomHeader, GridCustomContent, onSelectedItemAction}: Props): ReactElement {

    const [isCheckAll, setIsCheckAll] = useState(false);



    // const [singleToggle, setSingleToggle] = useState(false);
    /*const onInputChange = (item:any) => {
        setSingleToggle(!singleToggle);
    }*/


    const onSelectAndUnselectHandler = () => {
        result.data.map((a: any) => a.checked = !isCheckAll);
        setIsCheckAll(!isCheckAll);
    }

    return (
        <div>

            <Table responsive borderless size="sm">
                <thead>
                <tr style={{background: "#bebebe"}}>

                    <th>
                        {/*<InputGroup.Checkbox />*/}

                        {/*<Form.Check*/}
                        {/*    type="checkbox"*/}
                        {/*    name="sourceType"*/}
                        {/*    onChange={onSelectAndUnselectHandler}*/}
                        {/*    checked={isCheckAll}*/}
                        {/*/>*/}

                    </th>
                    <th>#</th>

                    {GridCustomHeader()}

                    <th style={{ minWidth: '350px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>

                {result?.map( (item: any, index: number) =>
                    <tr key={index}>
                        <td>
                            <Form.Check type="checkbox" name="checked" onChange={ event => onSelectedItemAction(item) } checked={item.checked}/>
                        </td>
                        <td>{index + 1}</td>
                        {GridCustomContent(item)}
                    </tr>
                )}

                </tbody>
            </Table>

        </div>
    )
}