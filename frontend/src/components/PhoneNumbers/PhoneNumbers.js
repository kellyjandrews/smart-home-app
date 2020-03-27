import React, {useState} from 'react';
import { db, fb } from '../../context/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmptyNumbers from './EmptyNumbers.js';
import ListNumbers from './ListNumbers';
import AddNumber from './AddNumber';
import VerifyNumber from './VerifyNumber';

import './phoneNumbers.css';

function PhoneNumbers() {
  const [value, loading, error] = useCollection(
    db.collection(`phoneNumbers`)
      .where("owner", "==", fb.auth().currentUser.uid)
  );

  const [ addNumber, setAddNumber ] = useState(null);
  const [verifyNumber, setVerifyNumber] = useState(null);

  if (loading) return <div className="loading loading-lg"></div>;
  if (error) return <strong>Error: {JSON.stringify(error)}</strong>;

  return (
    <>
      <div className="panel column col-4">
        <div className="panel-header">
          <div className="panel-title float-left h5">Phone Numbers</div>
          
          <a className="float-right" href="#" onClick={() => setAddNumber(true)}><FontAwesomeIcon icon={faPlus} size="sm" /> Add Number</a>
          <div className="clearfix"></div>
          <div className="clearfix divider"></div>
        </div>
        <div className="panel-body" id="numbersPanel">
          {addNumber ? <AddNumber toggle={setAddNumber} setNumber={setVerifyNumber}/> : null}
          {verifyNumber ? <VerifyNumber toggle={setVerifyNumber} number={verifyNumber} list={value.docs} /> : null}
          {value?.docs.length > 0 ?
            <ListNumbers numbers={value.docs} setVerifyNumber={setVerifyNumber} />
            : <EmptyNumbers toggle={setAddNumber} />
          }
        </div>
        <div className="panel-footer">
        </div>
      </div>
      
  </>
  );
}

export default PhoneNumbers;
//<NumberModal visible={visible} phoneNumber={null} hide={toggle} list={value?.docs} />