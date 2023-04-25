import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
import { Calendar } from "primereact/calendar";
const CalendarEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		day_type: yup.string().required().label("Day Type"),
		str_staff_nbr: yup.string().required().label("Str Staff Nbr"),
		date: yup.string().required().label("Date"),
		starttime: yup.string().required().label("Start Time"),
		endtime: yup.string().required().label("End Time"),
		txt_day_description: yup.string().required().label("Text Day Description")
	});
	// form default values
	const formDefaultValues = {
		day_type: '', 
		str_staff_nbr: '', 
		date: new Date(), 
		starttime: new Date(), 
		endtime: new Date(), 
		txt_day_description: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/calendar`);
		}
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="CalendarEditPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label=""  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title="Edit Calendar"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => {
                            submitForm(values);
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Day Type *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="day_type"  onChange={formik.handleChange}  value={formik.values.day_type}   label="Day Type" type="text" placeholder="Enter Day Type"        className={inputClassName(formik?.errors?.day_type)} />
                                                <ErrorMessage name="day_type" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Str Staff Nbr *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="str_staff_nbr"  onChange={formik.handleChange}  value={formik.values.str_staff_nbr}   label="Str Staff Nbr" type="text" placeholder="Enter Str Staff Nbr"        className={inputClassName(formik?.errors?.str_staff_nbr)} />
                                                <ErrorMessage name="str_staff_nbr" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Date *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date" showButtonBar className={inputClassName(formik?.errors?.date)} dateFormat="yy-mm-dd" value={formik.values.date} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="date" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Start Time *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="starttime" value={formik.values.starttime} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.starttime)}        />
                                                <ErrorMessage name="starttime" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                End Time *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="endtime" value={formik.values.endtime} onChange={formik.handleChange} showButtonBar showTime dateFormat="yy-mm-dd" hourFormat="24"showIcon className={inputClassName(formik?.errors?.endtime)}        />
                                                <ErrorMessage name="endtime" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                Text Day Description *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="txt_day_description"  className={inputClassName(formik?.errors?.txt_day_description)}   value={formik.values.txt_day_description} placeholder="Enter Text Day Description" onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="txt_day_description" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label="Update" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            );
                            }
                            }
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}
CalendarEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'calendar',
	apiPath: 'calendar/edit',
	routeName: 'calendaredit',
	submitButtonLabel: "Update",
	formValidationError: "Form is invalid",
	formValidationMsg: "Please complete the form",
	msgTitle: "Update Record",
	msgAfterSave: "Record updated successfully",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default CalendarEditPage;
