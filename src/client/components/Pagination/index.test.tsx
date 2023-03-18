import { fireEvent, render, waitFor } from "@testing-library/react"
import Pagination from "."
import Sinon from "sinon"



describe('Pagination', () => {
    let page: number;

    let paginationFake: any;

    beforeEach(() => {
        page = 0;
        paginationFake = Sinon.fake((id) => {
            page = id;
        })
    })

    it("shoudl mount, call pagination when it's needed & move to page 1 & 2", async () => {

        const pageId = 1;

        const { getByRole } = render(<Pagination pageId={pageId} pagination={paginationFake} />)

        const page1 = getByRole('link', { name: '1' });
        const page2 = getByRole('link', { name: '2' });
        fireEvent.click(page1)

        // @ts-ignore
        expect(page).toBe(1);
        expect(paginationFake.calledOnce).toBeTruthy();


        fireEvent.click(page2)
        
        // @ts-ignore
        expect(page).toBe(2)
        expect(paginationFake.calledTwice).toBeTruthy();
    })

    it('should move to next', () => {
        const pageId = 2;

        const { getByRole } = render(<Pagination pageId={pageId} pagination={paginationFake} />)

        const next = getByRole('link', { name: 'Next' });

        fireEvent.click(next)

        expect(page).toBe(pageId + 1)
        expect(paginationFake.calledOnce).toBeTruthy();

    })

    it('should go back to previous', () => {
        const pageId = 3;
        const { getByRole } = render(<Pagination pageId={3} pagination={paginationFake} />)
       
        const previous = getByRole('link', { name: 'Previous' });

        fireEvent.click(previous)


        expect(page).toBe(pageId - 1)
        expect(paginationFake.calledOnce).toBeTruthy();

    })

})