import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../context/firebase';

function ListNumbers({ numbers, setVerifyNumber }) {
  const deleteNumber = (id) => db.collection('phoneNumbers').doc(id).delete();

  return (
    <>
      {numbers.map(number => {
        return (
          <div className="tile" key={number.id}>
            <div className="tile-content">
              {number.id} {number.data().verified ?
                <FontAwesomeIcon className="text-success" icon={faCheckCircle} />
                : <FontAwesomeIcon className="text-warning" icon={faExclamationCircle} onClick={() => { setVerifyNumber(number.id) }} />
              }
            </div>
            <div className="tile-action">
              <FontAwesomeIcon className="text-error" icon={faMinusCircle} onClick={() => deleteNumber(number.id)} />
            </div>
          </div>
        )
      })}
    </>
  );
}

export default ListNumbers;