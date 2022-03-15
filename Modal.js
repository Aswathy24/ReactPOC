import React, { useEffect, useState ,useContext} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modalStyles.css";
import { Button, Modal, ModalFooter, ModalBody, Input } from "reactstrap";
import { getCoList, handleValues } from "../utils";
import AccountLister from "./AccountComponent";
import { UserContext } from "../../App";

const ModalComponent = ({ modal, setModal, coList, groupbyType, handleAddClick ,groupMap,setGroupMap}) => {
  console.log('selcted previous group --', groupbyType)
  const { templateList, setTemplateList,accountList,setAccountList, groups, setGroups,dropDownvalues, setDropDownValues} =
  useContext(UserContext);
  var slectedOne = groups.map(g => {
    if (groupbyType && groupbyType['AGG']) {
      const selectedGroup = groupbyType['AGG'];
      let obj;
       return selectedGroup.map(s => {
         if(s.name === g.name) {
           obj = s;
         }
       })
       return obj;
    } else return g
  })
  console.log('group --- ', groups, slectedOne)

  const toggle = () => setModal(!modal);

  

  const handleCheckboxClick = (i, type, value) => {
    const temp = JSON.parse(JSON.stringify(groups));
    if(value) {
        temp[i][type] = value;
    } else {
        temp[i][type] = !temp[i][type];
    }
    setGroups(temp);
  };

  const onClickHandler = () => {
    toggle();
    const obj = {
      DSG: [],
      AGG: [],
      IND: []
    }
    groups.forEach(ele => {
      console.log("DropDown valiue on click of Add",ele.dropdownValue);
      if(ele.dropdownValue.includes('DSG'))
        obj['DSG'].push(ele)
      
      if(ele.dropdownValue.includes('AGG'))
        obj['AGG'].push(ele)
      
        if(ele.dropdownValue.includes('IND'))
        obj['IND'].push(ele)
      
    })
    handleAddClick(obj);
  }

  const oba =   {

    "limit": 10,
    "offset": 1,
    "count": 50,
    "billtoList": [
        {
            "accountId": 1111,
            "obaNumber": "OBA-1111",
            "legacyAccNum": null,
            "accountType": "BILL-TO",
            "efxId": "223232",
            "legalName": "ABCD",
            "accountStatusDesc": "active",
            "accountStatus": 27,
            "companyNumber": "0210",
            "billtoId": null,
            "shiptoList": [
                {
                    "accountId": 2222,
                    "obaNumber": "OBA-2222",
                    "legacyAccNum": "spx777",
                    "accountType": "BILL-TO",
                    "efxId": "888888",
                    "legalName": "PQR",
                    "accountStatusDesc": "active",
                    "accountStatus": 27,
                    "companyNumber": "0210",
                    "billtoId": 1111,
                    "shiptoList": []
                },
                {
                    "accountId": 3333,
                    "obaNumber": "OBA-3333",
                    "legacyAccNum": "spx777",
                    "accountType": "BILL-TO",
                    "efxId": "888888",
                    "legalName": "PQR",
                    "accountStatusDesc": "active",
                    "accountStatus": 27,
                    "companyNumber": "0210",
                    "billtoId": 1111,
                    "shiptoList": []
                
                }
            ]
            
        },
        {
            "accountId": 4444,
            "obaNumber": "OBA-4444",
            "legacyAccNum": null,
            "accountType": "BILL-TO",
            "efxId": "223232",
            "legalName": "ABCD",
            "accountStatusDesc": "active",
            "accountStatus": 27,
            "companyNumber": "0210",
            "billtoId": null,
            "shiptoList": [
                {
                    "accountId": 5555,
                    "obaNumber": "OBA-5555",
                    "legacyAccNum": "spx777",
                    "accountType": "BILL-TO",
                    "efxId": "888888",
                    "legalName": "PQR",
                    "accountStatusDesc": "active",
                    "accountStatus": 27,
                    "companyNumber": "0210",
                    "billtoId": 1111,
                    "shiptoList": []
                },
                 {
                    "accountId": 6666,
                    "obaNumber": "OBA-6666",
                    "legacyAccNum": "spx777",
                    "accountType": "BILL-TO",
                    "efxId": "888888",
                    "legalName": "PQR",
                    "accountStatusDesc": "active",
                    "accountStatus": 27,
                    "companyNumber": "0210",
                    "billtoId": 1111,
                    "shiptoList": []
}
            ]
             
            
        }
    ]
    
};


let obaList= oba.billtoList;

const isSelectedGroup = (group) => {
  let g = groupbyType['AGG'] || [];
  let find = g.filter(a=>a.dropdownValue === group);
  if (find && find.length)
    return true
  else return false;
}

useEffect(() => {
  setAccountList(obaList);
}, [obaList.length])  ;

  return (
    <div
      style={{
        display: "block",
        padding: 40,
      }}
    >
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <div className="modalBody">
            <div> 
              <AccountLister />
            </div>
            {groups.map((ele, i) => (
              <div className="listContainer" key={ele.id}>
                <div className="listItem">
                  <span style={{ width: "8rem" }}>{ele.name}</span>
                  <Input
                    name="check"
                    type="checkbox"
                    checked={ele.isSelected}
                    onClick={() => handleCheckboxClick(i, "isSelected")}
                  />
                  {ele.P !== undefined && (
                    <>
                      <div>
                        <Input
                          name="check"
                          type="checkbox"
                          className={`checkboxWithName ${
                            ele.P ? "bgColorActive" : "bgColorNotActive"
                          }`}
                          style={{ position: "relative" }}
                          onClick={(e) => e.preventDefault()}
                        />
                        <span
                          className="alignText"
                          onClick={() => handleCheckboxClick(i, "P")}
                        >
                          P
                        </span>
                      </div>
                    </>
                  )}
                  {ele.AF !== undefined && (
                    <div>
                      <Input
                        name="check"
                        type="checkbox"
                        className={`checkboxWithName ${
                          ele.AF ? "bgColorActive" : "bgColorNotActive"
                        }`}
                        onClick={(e) => e.preventDefault()}
                      />
                      <span
                        className="alignText"
                        style={{ marginLeft: "-21px" }}
                        onClick={() => handleCheckboxClick(i, "AF")}
                      >
                        AF
                      </span>
                    </div>
                  )}
                  {ele.L !== undefined && (
                    <div>
                      <Input
                        name="check"
                        type="checkbox"
                        className={`checkboxWithName ${
                          ele.L ? "bgColorActive" : "bgColorNotActive"
                        }`}
                        onClick={(e) => e.preventDefault()}
                      />
                      <span
                        className="alignText"
                        onClick={() => handleCheckboxClick(i, "L")}
                      >
                        L
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <select className="dropdownContainer"
                   onChange={(e) => handleCheckboxClick(i, 'dropdownValue', e.target.value)}>
                    <option value="">Select</option>
                    {dropDownvalues[ele.name]?.map((el) => (
                      <option selected={ele.dropdownValue == el} key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => onClickHandler()}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalComponent;
