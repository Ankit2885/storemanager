import React from 'react'

const DetailsForm = () => {
    return (
        <div className="container my-3">
            <h1>Store Manager</h1>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name='name' aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="number" class="form-control" id="phone" name='phone' />
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="itemRadios" id="exampleRadios1" value="option1" />
                    <label class="form-check-label" for="exampleRadios1">
                        Liquid Item
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="itemRadios" id="exampleRadios2" value="option2" />
                    <label class="form-check-label" for="exampleRadios2">
                        Solid Item
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="itemRadios" id="exampleRadios3" value="option3" />
                    <label class="form-check-label" for="exampleRadios3">
                        Both Item
                    </label>
                </div>
                <button type="submit" class="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default DetailsForm