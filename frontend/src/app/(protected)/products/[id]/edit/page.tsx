const EditPage = async ({params}: {params: Promise<{id: number}>}) => {
    const {id} = await params
    return(
        <div>
            {id}
        </div>
    )
}

export default EditPage