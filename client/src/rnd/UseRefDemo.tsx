import React, {ReactElement, useEffect, useRef} from 'react'

interface Props {

}

export default function UseRefDemo({}: Props): ReactElement {
    const refContainer:any = useRef(null)

    const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log(refContainer.current.value)
    }

    useEffect(() => {
        refContainer.current.focus()
        refContainer.current.value = `default value`;
    }, [])

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <input ref={refContainer} type="text" />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}