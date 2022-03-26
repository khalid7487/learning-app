import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {getDemoPaginationData} from "./DemoGrid.service";
import DataTableGrid from "./DataTable.grid";
import {Pagination} from "react-bootstrap";

interface Props {

}

export default function DemoGridPage({}: Props): ReactElement {

    const [post, setPost]:any = useState({});

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        from_location: '',
        to_location: ''
    });


    useEffect( () => {
        ( async () => {
            await filterData({});
        })()
    }, [])

    const filterData = async (queries:any) => {
        console.log('msg', queries);

        let res = await getDemoPaginationData(queries)
        if(res.status === 200) {
            let data = await res.json();
            setPost(data);

            console.log('msg', data);
        }
    }


    const onSelectedItemAction = (selectedItem:any) => {
        selectedItem.checked = !selectedItem.checked
        console.log('msg-'+ selectedItem.id, selectedItem.checked);
    }

    // Grid Components
    const GridCustomActions = (item: any) => {
        // let isCollector = item?.roles?.some( (role:any) => role.name === 'COLLECTOR')
        return <>
            {item?.actions?.includes('C') ? '' : ''} {' | '}
        </>
    }


    const GridCustomHeader = () => {
        return <>
            <th>ID</th>
            <th>From Location</th>
            <th>To Location</th>
            <th>Price</th>
            <th>Disatnce</th>
        </>
    }


    const GridCustomContent = (item: any) => {
        return <>
            <td>{item.id}</td>
            <td>{item.from_location}</td>
            <td>{item.to_location}</td>
            <td>{item.price}</td>
            <td>{item.distance}</td>

            <td>{GridCustomActions(item)}</td>
        </>
    }




    return (
        <div className="mt-4 container-fluid">

            <DataTableGrid result={post}
                           GridCustomHeader={GridCustomHeader}
                           GridCustomContent={GridCustomContent}
                           onSelectedItemAction={onSelectedItemAction}
            />

            <div className="d-flex justify-content-between">
                <div>Items: {post?.limit}</div>

                <div>
                    <Pagination size="sm">
                        <Pagination.Prev onClick= { e => filterData({from_location: filterQueries?.to_location, page: post.page-1 }) }/>
                        <Pagination.Item> Pages: {post?.page }/{post?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick= { e => filterData({from_location: filterQueries?.to_location, page: post.page+1 }) }/>
                    </Pagination>
                </div>

                <div>Total: {post?.count}</div>
            </div>

        </div>
    )
}