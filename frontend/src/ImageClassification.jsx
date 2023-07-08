import { Navbar, TaskTile } from './Utils'
import { Link } from 'react-router-dom'

export default function ImageClassifcationPage() {
    return (
        <div>
        <Navbar />
        <div className="ml-4 mr-4">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">Experiments</h1>
          <div className="flex flex-wrap">
            <Link to="cards-classification">
            <TaskTile
                taskname="Cards Classification"
                src="./cards.jpg"
              />
            </Link>
              
          </div>
        </div>
      </div>
        
    )
}