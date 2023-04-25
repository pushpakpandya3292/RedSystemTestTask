import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import CalendarEditPage from 'pages/calendar/Edit';
import useApp from 'hooks/useApp';

import useViewPage from 'hooks/useViewPage';
const CalendarViewPage = (props) => {
		const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError, deleteItem } = pageController;
	function ActionButton(data){
		const items = [
		{
			label: "Edit",
			command: (event) => { app.openPageDialog(<CalendarEditPage isSubPage apiPath={`/calendar/edit/${data.id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil"
		},
		{
			label: "Delete",
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash"
		}
	]
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
				</div>
			);
		}
	}
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="CalendarViewPage" className="main-page">
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
                    <Title title="Calendar Details"   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        {/*PageComponentStart*/}
                        <div className="mb-3 grid justify-content-start">
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Id</div>
                                        <div className="font-bold">{ item.id }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Day Type</div>
                                        <div className="font-bold">{ item.day_type }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Str Staff Nbr</div>
                                        <div className="font-bold">{ item.str_staff_nbr }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Date</div>
                                        <div className="font-bold">{ item.date }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Start Time</div>
                                        <div className="font-bold">{ item.starttime }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">End Time</div>
                                        <div className="font-bold">{ item.endtime }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center p-3 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">Text Day Description</div>
                                        <div className="font-bold">{ item.txt_day_description }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-content-between">
                            <div className="flex justify-content-start">
                                {ActionButton(item)}
                            </div>
                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
CalendarViewPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'calendar',
	apiPath: 'calendar/view',
	routeName: 'calendarview',
	msgBeforeDelete: "Are you sure you want to delete this record?",
	msgTitle: "Delete record",
	msgAfterDelete: "Record deleted successfully",
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default CalendarViewPage;
