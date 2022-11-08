const Total = ({ total }: TotalProps) => {
return <b>Total number of exercises {total}</b>
};

type TotalProps = { total: number };

export default Total