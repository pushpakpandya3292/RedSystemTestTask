import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
import { Calendar } from 'primereact/calendar';
const CalendarAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		day_type: yup.string().required().label("Day Type"),
		str_staff_nbr: yup.string().required().label("Str Staff Nbr"),
		date: yup.string().required().label("Date"),
		starttime: yup.string().required().label("Start Time"),
		endtime: yup.string().required().label("End Time"),
		txt_day_description: yup.string().required().label("Text Day Description")
	});
	
	//form default values
	const formDefaultValues = {
		day_type: '', 
		str_staff_nbr: '', 
		date: new Date(), 
		starttime: new Date(), 
		endtime: new Date(), 
		txt_day_description: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/calendar`);
		}
	}
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="CalendarAddPage" className="main-page">
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
                    <Title title="Add New Calendar"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
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
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label="Submit" icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            </>
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

//page props and default values
CalendarAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'calendar',
	apiPath: 'calendar/add',
	routeName: 'calendaradd',
	submitButtonLabel: "Submit",
	formValidationError: "Form is invalid",
	formValidationMsg: "Please complete the form",
	msgTitle: "Create Record",
	msgAfterSave: "Record added successfully",
	msgBeforeSave: "",
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default CalendarAddPage;
