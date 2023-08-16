import { Back, Button, Card, DropDown, ImagePicker, Input, Modal, TextAreaInput, showToast } from '@Components'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInput, useDropDown, useNavigation, useLoader, useModal } from "@Hooks";
import { translate } from '@I18n';
import { addProductCategory, addProductService, getProductCategory } from '@Redux';
import { PRODUCT_CATEGORY, PRODUCT_SERVICE, getDropDownDisplayData, getValidateError, ifObjectExist, validate } from '@Utils';

function AddProduct() {
    const dispatch = useDispatch()
    const productName = useInput('')
    const Description = useInput('')
    const ProductCategory = useDropDown({})
    const [photo, setPhoto] = useState('')
    const loginLoader = useLoader(false)
    const { goBack } = useNavigation()
    const CategoryHandlerModal = useModal(false)
    const { dashboardDetails, fetchProductCategoryData, selectedCompany } = useSelector((state: any) => state.UserCompanyReducer)

    const productCategoryName = useInput('')
    const ProductCategoryDescription = useInput('')
    const [categoryPhoto, setCategoryPhoto] = useState('')

    const submitHandler = () => {

        const params = {
            name: productName.value,
            description: Description.value,
            tagline: "",
            photo: photo,
            product_category_id: ProductCategory?.value?.id
        }

        const validation = validate(PRODUCT_SERVICE, params);
        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(
                addProductService({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            loginLoader.hide()
                            showToast(response.message, "success");
                            goBack();
                            reTryValue()
                        }

                    },
                    onError: (error: any) => () => {
                        loginLoader.hide()
                    },

                })

            )
        }
        else {
            showToast(getValidateError(validation));
        }

    }
    const reTryValue = () => {
        productName.set('')
        Description.set('')
        setPhoto('')
        ProductCategory.set({})
    }
    const reTryCategory = () => {
        productCategoryName.set('')
        ProductCategoryDescription.set('')
        setCategoryPhoto('')

    }


    useEffect(() => {

        getProductCategoryHandler()
        reTryValue()

    }, [])

    const getProductCategoryHandler = () => {

        const params = {
            brand__id: selectedCompany?.id,
            per_page_count: -1,
        }
        dispatch(
            getProductCategory({
                params,
                onSuccess: (response: any) => () => {

                },
                onError: (error: any) => () => {

                }


            })

        )

    }

    const addProductSubmitHandler = () => {
        const params = {
            name: productCategoryName.value,
            description: ProductCategoryDescription.value,
            tagline: "",
            photo: categoryPhoto,
            brand__id: selectedCompany?.id,
        }
        const validation = validate(PRODUCT_CATEGORY, params);
        if (ifObjectExist(validation)) {

            dispatch(
                addProductCategory({
                    params,
                    onSuccess: () => () => {
                        CategoryHandlerModal.hide()
                        getProductCategoryHandler()
                        reTryCategory()

                    },
                    onError: () => () => {
                        CategoryHandlerModal.hide()

                    }
                })
            )
        }
        else {
            showToast(getValidateError(validation));
        }

    }

    return (<>
        <Card className="m-3">
            <div className='col'>
                <div className="row">
                    <div className={' col row'}>
                        <Back />
                        <h3 className="ml-3">{'Add Product'}</h3>

                    </div>

                    <div className={' col-auto '}>
                        <Button text={'Add category'} size={'sm'} onClick={() => CategoryHandlerModal.show()} />

                    </div>
                </div>

            </div>
            <hr className='mt-3'></hr>
            <div className="col-md-6">
                <Input
                    heading={'Product Name'}
                    value={productName.value}
                    onChange={productName.onChange}
                />
                <TextAreaInput
                    heading={'Description'}
                    value={Description.value}
                    onChange={Description.onChange}
                />



                {fetchProductCategoryData && fetchProductCategoryData.length > 0
                    && <DropDown
                        heading={'Category'}
                        data={getDropDownDisplayData(fetchProductCategoryData)}
                        selected={ProductCategory.value}
                        value={ProductCategory.value}
                        onChange={ProductCategory.onChange}
                    //   placeHolder={userDataList?.designation?.name}
                    />
                }


            </div>
            <div className="mt--2">


                <ImagePicker
                    size='xl'
                    heading="photo"
                    noOfFileImagePickers={0}

                    onSelect={(image) => {
                        let file = image.toString().replace(/^data:(.*,)?/, "")
                        setPhoto(file)

                    }}
                    onSelectImagePicker={() => {
                    }}
                />

            </div>

            <div className="col mt-4">
                <Button
                    text={translate("common.submit")}
                    onClick={submitHandler}
                    loading={loginLoader.loader}
                />
            </div>
        </Card>
        <Modal title={'Add Category'} isOpen={CategoryHandlerModal.visible} size={'md'} onClose={() => {
            CategoryHandlerModal.hide()
            reTryCategory()
        }} >
            <div className={''}>
                <Input
                    heading={'Product Name'}
                    value={productCategoryName.value}
                    onChange={productCategoryName.onChange}
                />
                <TextAreaInput
                    heading={'Description'}
                    value={ProductCategoryDescription.value}
                    onChange={ProductCategoryDescription.onChange}
                />



                <div className={'row'}>
                    <ImagePicker
                        size='xl'
                        heading="photo"
                        noOfFileImagePickers={1}
                        defaultPicker={true}
                        onSelect={(image) => {
                            let file = image.toString().replace(/^data:(.*,)?/, "")
                            setCategoryPhoto(file)

                        }}

                    />

                </div>


                <div className={'  mt-3'}>
                    <Button text={' Submit '} size={'sm'} onClick={() => { addProductSubmitHandler() }} />

                </div>


            </div>

        </Modal>
    </>

    )
}

export { AddProduct }