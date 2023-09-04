import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { Div } from "src/components/atoms/Div";
import { PageHeader } from "src/components/atoms/PageHeader/PageHeader";
import { Span } from "src/components/atoms/Span";

interface IProps { }

const Tile = styled.div<{ variant: 'primary' | 'secondary', fixedHeight?: boolean }>`
  min-height: 75px;
  padding: 1rem;
  margin: 1rem;

  background-color: ${p => p.variant === 'primary' ? p.theme.palette.primary.main : p.theme.palette.greyLight};
  color: ${p => p.variant === 'primary' ? p.theme.palette.primary.contrastText : p.theme.palette.black};

  ${p => p.fixedHeight && css`height: 275px;`}
`

export const Help: React.FC<IProps> = (props): JSX.Element => {

  return (
    <>
      <PageHeader title="Help" />

      <div className="container">

        <div className="row">

          <div className="col-sm-12 col-md-6">
            <Tile variant="secondary" fixedHeight>

              <h2 className="bold">Our Address</h2>

              <Span size="lg">
                <p>
                  The Christie NHS Foundation Trust
                  <br />Wilmslow Road
                  <br />Manchester
                  <br />M20 4BX
                  <br />United Kingdom
                </p>
              </Span>

            </Tile>
          </div>

          <div className="col-sm-12 col-md-6">
            <Tile variant="primary" fixedHeight>

              <h2 className="bold">Main Numbers</h2>

              <Div size="lg">
                Switchboard: <br />
                <Span bold>0161 446 3000</Span>
              </Div>

              <Div size="lg">
                The Christie Hotline: <br />
                <Span bold>0161 446 3658</Span>
              </Div>

            </Tile>
          </div>

          <div className="col-sm-12">
            <Tile variant="secondary" className="d-flex align-items-center justify-content-center">
              <Div size="lg">
                You can find more help on <a className="bold" href="https://www.christie.nhs.uk" target="_blank" rel="noreferrer">The Christie website</a>
              </Div>
            </Tile>
          </div>

        </div>

      </div>
    </>
  );
}
