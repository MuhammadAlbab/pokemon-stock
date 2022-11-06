import { useNavigate } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import { getListPokemon } from "../api";

interface PokemonData {
  name: string;
  current_stock: string;
  [key: string]: any;
}

const List: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<PokemonData[] | null>(null);
  const [filteredPokemonList, setFilteredPokemonList] = useState<
    PokemonData[] | null
  >(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setIsLoadingList(true);
        let data: PokemonData[] | null = await getListPokemon();
        setPokemonList(data);
        setFilteredPokemonList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingList(false);
      }
    };
    fetchList();
  }, []);

  useEffect(() => {
    if (search.length !== 0) {
      let filteredArr: PokemonData[] = [];
      if (pokemonList?.length) {
        let searchVal: string = search;
        filteredArr = [...pokemonList].filter((e: any) => {
          return e.name.includes(searchVal.toLowerCase());
        });
      }
      setFilteredPokemonList(filteredArr);
    } else {
      setFilteredPokemonList(pokemonList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleOnDetail = (payload: string) => {
    navigate("/detail", { state: { name: payload } });
  };

  return (
    <div className="container flex justify-center">
      <div style={{ maxWidth: "640px" }}>
        <p className="huge-title mt-30 mb-0">Stok Pokémon</p>
        <div className="my-16">
          <input
            type="text"
            placeholder="Cari Pokémon"
            className="search-bar full-width mb-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isLoadingList ? (
          <div className="flex justify-center">Please wait...</div>
        ) : (
          <>
            {filteredPokemonList ? (
              <table>
                <thead>
                  <tr>
                    <th className="text-a-left">Nama</th>
                    <th className="text-a-right">Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPokemonList.length
                    ? filteredPokemonList.map((e: any, idx: number) => {
                        return (
                          <tr
                            className="font-w-600 pointer"
                            key={idx}
                            onClick={() => handleOnDetail(e.name)}
                          >
                            <td className="text-blue-primary text-a-left text-t-capitalize">
                              {e.name}
                            </td>
                            <td className="text-a-right">
                              {e.current_stock} pcs
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            ) : (
              <div>Something went wrong, reload page!</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
