interface RoomPaginatorProp {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const RoomPaginator: React.FC<RoomPaginatorProp> = ({
  currentPage,
  totalPages,
  onPageChange,
}: RoomPaginatorProp) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);//[1,2,3,4...]

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={` page-item ${
              currentPage === pageNumber ? "active" : ""
            } `}
          >
            <button
              className={`page-link`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RoomPaginator;
