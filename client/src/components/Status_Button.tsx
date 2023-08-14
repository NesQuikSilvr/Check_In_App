import { Status } from './Student'

const StatusButton = () => {

    let stat_types = Object.keys(Status) as Array<keyof typeof Status>

    return (
        <>
        {/* Status dropdown list */}
            <select name="cars" id="cars">
                {
                    stat_types.map( type => 
                        <option value={type}>{type}</option>
                    )
                }
            </select>

        {/* Classes dropdown list */}
        <div className="btn-group">
                <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown">
                Set Status
                </button>
                <ul className="dropdown-menu">
                {
                    stat_types.map( classroom =>
                    <li key={classroom}>
                        <a className="dropdown-item" href="#">
                        {classroom}
                        </a>
                    </li>
                    )
                }
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item" href="#">Show full student list</a></li>
                </ul>
            </div>
        </>
    )
}

export default StatusButton;


