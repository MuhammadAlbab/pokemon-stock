import {
  FC,
  useState,
  ChangeEvent,
  forwardRef,
  ReactElement,
  Ref,
} from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Button from "../components/Button";
import { getListPokemon } from "../api";
import { setItem } from "../utils/storage";
import { TransitionProps } from "@mui/material/transitions";
import { ReactComponent as XIcon } from "../assets/x.svg";
import { ReactComponent as ArrowForwardIcon } from "../assets/arrow-forward.svg";
import { getDate, getTime } from "../utils/time";

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

interface Props {
  state: boolean;
  data: PokemonData;
  stateHandler: (p: boolean) => void;
  updateData: (p: string) => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogInputAmount: FC<Props> = ({
  state,
  stateHandler,
  data,
  updateData,
}) => {
  const [amountPcs, setAmountPcs] = useState<number>(0);
  const [amountDozen, setAmountDozen] = useState<number>(0);
  const [isDialogConfirm, setIsDialogConfirm] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const handleClose = () => {
    handleCloseConfirm();
    stateHandler(false);
    setAmountPcs(0);
    setAmountDozen(0);
  };

  const handleSave = () => {
    let added_stock = amountPcs + amountDozen;
    if (added_stock <= 0) {
      stateHandler(false);
    } else {
      setIsDialogConfirm(true);
    }
  };

  const handleSaveConfirm = async () => {
    let added_stock = amountPcs + amountDozen;
    let total_stock = added_stock + parseInt(data.current_stock);
    let submitData: PokemonData = {
      ...data,
      current_stock: total_stock.toString(),
    };
    submitData.history_update.unshift({
      date: getDate(),
      time: getTime(),
      status: "Update Stok",
      note,
      current_stock: total_stock.toString(),
      added_stock: added_stock.toString(),
    });
    let pokemonArr: PokemonData[] = await getListPokemon();
    let filteredPokemonArr = pokemonArr.filter((e) => e.name !== data.name);
    filteredPokemonArr.unshift(submitData);
    setItem("list", filteredPokemonArr);
    updateData(data.name);
    handleClose();
  };

  const handleCloseConfirm = () => {
    setNote("");
    setIsDialogConfirm(false);
  };

  return (
    <div>
      <Dialog
        open={state}
        onClose={(_, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleClose();
        }}
      >
        <div className="p-12">
          <p className="font-20 font-w-700 text-a-center">Update stok</p>
          <p className="font-14 mt-8 text-a-center">
            Masukan jumlah stok yang tersedia dirak saat ini
          </p>
          <table className="mb-12">
            <thead>
              <tr>
                <th className="text-a-left">Kemasan</th>
                <th className="text-a-right">Jmlh</th>
                <th className="text-a-right">Stok</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-w-600 text-a-left">Pcs</td>
                <td className="flex flex--gap-6 items-center justify-end">
                  <p>1 x</p>
                  <input
                    type="number"
                    min={1}
                    style={{
                      textAlign: "right",
                      maxWidth: "48px",
                      height: "36px",
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.value === "") {
                        setAmountPcs(0);
                      } else {
                        setAmountPcs(parseInt(e.target.value));
                      }
                    }}
                  />
                </td>
                <td className="text-a-right">{amountPcs}</td>
              </tr>
              <tr>
                <td className="font-w-600 text-a-left">Lusin</td>
                <td className="flex flex--gap-6 items-center justify-end">
                  <p>1 x</p>
                  <input
                    type="number"
                    min={1}
                    style={{
                      textAlign: "right",
                      maxWidth: "48px",
                      height: "36px",
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.value === "") {
                        setAmountDozen(0);
                      } else {
                        setAmountDozen(12 * parseInt(e.target.value));
                      }
                    }}
                  />
                </td>
                <td className="text-a-right">{amountDozen}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-14 mb-32">
            <div>
              <span className="font-w-700">Total stok</span> (dalam pcs)
            </div>
            <div className="font-w-700">{amountPcs + amountDozen}</div>
          </div>

          <div className="flex flex--gap-8 items-center justify-end">
            <Button title="Simpan" type="primary" onClickHandler={handleSave} />
            <Button
              title="Batal"
              type="secondary"
              onClickHandler={handleClose}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isDialogConfirm}
        onClose={(_, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleCloseConfirm();
        }}
        fullScreen
        TransitionComponent={Transition}
      >
        <>
          <div
            className="px-8 flex items-center py-12"
            style={{ boxShadow: "0px 2px 4px rgba(51, 51, 51, 0.15" }}
          >
            <div className="pointer" onClick={handleCloseConfirm}>
              <XIcon />
            </div>
            <div className="font-16 font-w-600 mr-auto ml-auto">
              <div
                className="text-t-capitalize"
                style={{ marginLeft: "-24px" }}
              >
                {data.name}
              </div>
            </div>
          </div>
          <div className="px-8 my-16">
            <div className="huge-title my-24">Konfirmasi update stok</div>
            <p className="font-14 m-0 mb-8">Selisih</p>
            <p className="font-32 m-0 mb-34">+{amountPcs + amountDozen} pcs</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-16 m-0 mb-8">Di sistem</p>
                <p className="font-24 m-0">{data.current_stock} pcs</p>
              </div>
              <div className="flex flex--gap-12 items-center">
                <ArrowForwardIcon />
                <div>
                  <p className="font-16 m-0 mb-8">Hasil update stok</p>
                  <p className="font-24 m-0">
                    {parseInt(data.current_stock) + amountPcs + amountDozen} pcs
                  </p>
                </div>
              </div>
            </div>
            <p className="font-20 font-w-700 mt-40">Detail stok opname</p>
            <table className="mb-12">
              <thead>
                <tr>
                  <th className="text-a-left">Keterangan</th>
                  <th className="text-a-right">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-a-left">
                    <p className="font-16 font-w-600 text-blue-primary m-0">
                      Hasil update stok
                    </p>
                    <p className="font-14 m-0 mt-8">
                      {amountPcs} pcs, {amountDozen / 12} lusin (12s)
                    </p>
                  </td>
                  <td className="flex flex--gap-6 items-center justify-end">
                    <p className="font-14 m-0">
                      {parseInt(data.current_stock) + amountPcs + amountDozen}{" "}
                      pcs
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-8 mt-auto">
            <p className="font-w-700 font-20 m-0 mb-16">Catatan</p>
            <textarea
              rows={4}
              className="full-width mb-20 p-8"
              placeholder="Contoh: stok awal"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setNote(e.target.value)
              }
            />
            <div className="flex justify-end mb-20">
              <Button
                title="Simpan"
                type="primary"
                onClickHandler={handleSaveConfirm}
              />
            </div>
          </div>
        </>
      </Dialog>
    </div>
  );
};

export default DialogInputAmount;
