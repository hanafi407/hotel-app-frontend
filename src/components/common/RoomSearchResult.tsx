import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import RoomCard from '../room/RoomCard';
import { Room } from '../utils/types';
import RoomPaginator from './RoomPaginator';

interface RoomSearchResultProp {
  results:Room[];
  onClearSearch:any;
}

const RoomSearchResult: React.FC<RoomSearchResultProp> = ({results,onClearSearch}) => {
const [currentPage, setCurrentPage] = useState<number>(1);
const [resultPerPage] = useState<number>(3);
const totalResult = results.length;
const totalPages =Math.ceil(totalResult/resultPerPage);
const handlePageChange = (pageNumber:number)=>{
  setCurrentPage(pageNumber);
}

const startIndex = (currentPage - 1) * resultPerPage;
const endIndex = startIndex +resultPerPage;
const paginatedResult = results.slice(startIndex,endIndex)

  return (
    <>
      {results.length > 0 ? (
        <>
          <h5 className='text-center mt--5'>Search Result</h5>
          <Row>
            {paginatedResult.map((room) => (
              <RoomCard room={room} key={room.id} />
            ))}
          </Row>
          <Row>
            {totalResult > resultPerPage && (
              <RoomPaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <Button variant='secondary' className='' onClick={onClearSearch}>
              Clear Search
            </Button>
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default RoomSearchResult;