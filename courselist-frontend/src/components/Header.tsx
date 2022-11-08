
const Header = ({courseName}: HeaderProps) => {
    return <h1>{courseName}</h1>
}

interface HeaderProps {
    courseName: string
}

export default Header