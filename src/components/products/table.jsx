import React,{useState} from "react";
import { Pagination } from "../../common";
import SelectItems from "../tables/selectItems";


const Table = ({children, info={}}) => {
  const [selectedValue, setSelectedValue] = useState(10);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Tabla de Productos</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <div
            className="dataTables_wrapper dt-bootstrap4"
            id="dataTable_wrapper"
          >
            <SelectItems
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            />

            <div className="row">
              <div className="col-sm-12">
                <table
                  className="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellSpacing={"0"}
                >
                  {children}
                </table>
              </div>
            </div>

            <Pagination select={selectedValue} info={info ? info : null} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
