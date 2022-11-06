import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowBackIcon } from "../assets/arrow-back.svg";
import Button from "../components/Button";
import { getDetailPokemon } from "../api";
import DialogInputAmount from "../components/DialogInputAmount";

interface HistoryStokPokemon {
  date: string;
  current_stock: string;
  added_stock: string;
  status: string;
  note: string;
  time: string;
}

interface PokemonData {
  name: string;
  current_stock: string;
  history_update: HistoryStokPokemon[];
}

const Detail: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<PokemonData | null>(null);
  const [dialogInputAmount, setDialogInputAmounr] = useState<boolean>(false);

  useEffect(() => {
    getDetail(location.state.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetail = (payload: string) => {
    let detail = getDetailPokemon(payload);
    if (detail) {
      setDetail(detail);
    } else {
      navigate("/");
    }
  };

  const handleOpenDialog = () => {
    setDialogInputAmounr(true);
  };
  const handleUpdateData = (payload: string) => {
    getDetail(payload);
  };

  return (
    <>
      <div
        className="px-8 flex items-center py-12"
        style={{ boxShadow: "0px 2px 4px rgba(51, 51, 51, 0.15" }}
      >
        <div className="pointer" onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </div>
        <div className="font-16 font-w-600 mr-auto ml-auto">
          <div style={{ marginLeft: "-24px" }}>Stok pokemon</div>
        </div>
      </div>
      <div className="container">
        {detail ? (
          <>
            <div className="huge-title text-t-capitalize my-24">
              {detail.name}
            </div>
            <Button
              type="secondary"
              title="Update stok"
              onClickHandler={handleOpenDialog}
            />
            <div className="mt-32">
              <p className="font-16 m-0 mb-6">Sisa stok</p>
              <p className="font-32 m-0">{detail.current_stock} pcs</p>
            </div>
          </>
        ) : null}
        <div className="my-24">
          <p className="m-0  mb-8 font-16 font-w-600">Riwayat stok</p>
          <p className="m-0 font-14">Satuan stok dalam pcs</p>
        </div>
        {detail?.history_update ? (
          <>
            {detail.history_update.map((e: any, idx: number) => {
              return (
                <table key={idx} className="mb-12">
                  <thead>
                    <tr>
                      <th className="text-a-left">{e.date}</th>
                      <th className="text-a-right">Jmlh</th>
                      <th className="text-a-right">Stok</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-a-left">
                        <div className="font-12 mb-4">{e.time}</div>
                        <div className="font-w-600 text-blue-primary text-t-capitalize my-6">
                          {e.status}
                        </div>
                        {e.note !== "" ? <div>"{e.note}"</div> : null}
                      </td>
                      {e.added_stock === "0" ? (
                        <td className="text-a-right">{e.added_stock}</td>
                      ) : (
                        <td className="text-green-primary text-a-right">
                          +{e.added_stock}
                        </td>
                      )}
                      <td className="text-a-right">{e.current_stock}</td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </>
        ) : (
          <div>Something went wrong, reload page!</div>
        )}
      </div>
      {detail ? (
        <DialogInputAmount
          state={dialogInputAmount}
          stateHandler={setDialogInputAmounr}
          data={detail}
          updateData={handleUpdateData}
        />
      ) : null}
    </>
  );
};

export default Detail;
