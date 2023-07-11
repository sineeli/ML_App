import { Navbar, TaskTile } from './Utils'
import { Link } from 'react-router-dom'

export default function ObjectDetectionPage() {
    return (
        <div>
        <Navbar />
        <div className="ml-4 mr-4">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Experiments</h1>
          <div className="flex flex-wrap">
            <TaskTile
                taskname="Car Number Plate Detection"
                src="./car_number_plate.jpg"
              />
          </div>
        </div>
      </div>
        
    )
}