SETCP0
(:methods
  recv_internal: 
    s2 POP
    s1 PUSH
    SEMPTY
    <{
      3 BLKDROP
    }> PUSHCONT
    IFJMP
    CTOS
    4 LDU
    s0 s1 XCHG
    1 PUSHINT
    AND
    <{
      3 BLKDROP
    }> PUSHCONT
    IFJMP
    LDMSGADDR
    LDMSGADDR
    s1 POP
    LDGRAMS
    s1 POP
    1 PUSHINT
    SDSKIPFIRST
    LDGRAMS
    s1 POP
    LDGRAMS
    s0 POP
    3 PUSHINT
    RSHIFT 1 QOUT
    2 CALLDICT
    s0 s5 XCHG
    NOT
    <{
      2DROP
      2 2 BLKDROP2
      s4 POP
      s3 s1 PUXC
      SDEQ
      405 THROWIFNOT
      s0 s1 XCHG
      LDMSGADDR
      LDREF
      LDMSGADDR
      s5 PUSH
      s3 s5 XCHG
      4 2 5 PUXC2
      s0 s1 XCHG
      3 CALLDICT
      s1 PUSH
      SDEMPTY
      0 EQINT
      <{
        s0 s1 XCHG
        LDGRAMS
        s1 PUSH
        <{
          85167505 PUSHINT
          0 PUSHINT
          NEWC
          s0 s6 XCHG2
          STSLICER
          ROT
          STSLICER
          s3 s4 XCHG
          s1 s3 s0 XCHG3
          3 PUSHINT
          0 PUSHINT
          16 PUSHINT
          NEWC
          6 STU
          s0 s7 XCHG2
          STSLICER
          s0 s5 XCHG2
          STGRAMS
          s1 s5 XCHG
          107 STU
          s1 s2 XCHG
          32 STU
          64 STU
          s2 PUSH
          ISNULL
          NOT
          <{
            ROT
            STBR
            s0 s1 XCHG
          }> PUSHCONT
          <{
            s2 POP
          }> PUSHCONT
          IFELSE
          s0 s1 XCHG
          ENDC
          s0 s1 XCHG
          SENDRAWMSG
        }> PUSHCONT
        <{
          4 BLKDROP
        }> PUSHCONT
        IFELSE
      }> PUSHCONT
      <{
        3 BLKDROP
      }> PUSHCONT
      IFELSE
    }> IFJMPREF
    s0 s7 XCHG
    32 LDU
    64 LDU
    1607220500 PUSHINT
    s3 s-1 PUXC
    EQUAL
    <{
      s2 POP
      s4 s8 XCHG
      s3 s7 XCHG
      s2 s6 XCHG
      s4 s5 XCHG
      s0 s2 XCHG
      <{
        s3 s6 XCPU
        SDEQ
        401 THROWIFNOT
        LDMSGADDR
        s1 PUSH
        1 CALLDICT
        LDMSGADDR
        1 LDI
        s1 POP
        LDGRAMS
        10000000 PUSHINT
        s1 s12 XCHG
        SUB
        s1 PUSH
        <{
          s1 s5 PUSH2
          ADD
          SUB
        }> PUSHCONT
        IF
        s2 PUSH
        2 PLDU
        0 NEQINT
        s0 PUSH
        <{
          s0 s6 XCHG
          SUB
        }> PUSHCONT
        <{
          s6 POP
        }> PUSHCONT
        IFELSE
        s0 PUSH
        -1 GTINT
        402 THROWIFNOT
        s1 PUSH
        <{
          85167505 PUSHINT
          NEWC
          s0 s10 XCHG2
          STSLICER
          s0 s12 XCHG2
          STSLICER
          1 PUSHINT
          s4 PUSH
          s10 s1 s4 XCHG3
          6 10 -1 PUXC2
          0 PUSHINT
          16 PUSHINT
          NEWC
          6 STU
          s0 s7 XCHG2
          STSLICER
          s0 s5 XCHG2
          STGRAMS
          s1 s5 XCHG
          107 STU
          s1 s2 XCHG
          32 STU
          64 STU
          s2 PUSH
          ISNULL
          NOT
          <{
            ROT
            STBR
            s0 s1 XCHG
          }> PUSHCONT
          <{
            s2 POP
          }> PUSHCONT
          IFELSE
          s0 s1 XCHG
          ENDC
          s0 s1 XCHG
          SENDRAWMSG
          s5 s8 XCHG
        }> PUSHCONT
        <{
          s2 s11 XCHG
          s8 POP
          2DROP
        }> PUSHCONT
        IFELSE
        s0 s2 XCHG
        <{
          s7 PUSH
          1 CALLDICT
          PUSHSLICE
          s2 PUSH
          SDEQ
          <{
            3576854235 PUSHINT
            s3 s8 XCHG
            s5 s0 s0 XCHG3
            PUSHNULL
            1 PUSHINT
            0 PUSHINT
            16 PUSHINT
            NEWC
            6 STU
            s0 s7 XCHG2
            STSLICER
            s0 s5 XCHG2
            STGRAMS
            s1 s5 XCHG
            107 STU
            s1 s2 XCHG
            32 STU
            64 STU
            s2 PUSH
            ISNULL
            NOT
            <{
              ROT
              STBR
              s0 s1 XCHG
            }> PUSHCONT
            <{
              s2 POP
            }> PUSHCONT
            IFELSE
            s0 s1 XCHG
            ENDC
            s0 s1 XCHG
            SENDRAWMSG
          }> PUSHCONT
          <{
            3576854235 PUSHINT
            s3 s8 XCHG
            s5 s0 s0 XCHG3
            PUSHNULL
            7 PUSHPOW2
            0 PUSHINT
            16 PUSHINT
            NEWC
            6 STU
            s0 s7 XCHG2
            STSLICER
            s0 s5 XCHG2
            STGRAMS
            s1 s5 XCHG
            107 STU
            s1 s2 XCHG
            32 STU
            64 STU
            s2 PUSH
            ISNULL
            NOT
            <{
              ROT
              STBR
              s0 s1 XCHG
            }> PUSHCONT
            <{
              s2 POP
            }> PUSHCONT
            IFELSE
            s0 s1 XCHG
            ENDC
            s0 s1 XCHG
            SENDRAWMSG
          }> IFREFELSE
        }> PUSHCONT
        <{
          s0 POP
          s3 POP
          s5 POP
        }> PUSHCONT
        IFELSE
        1 4 BLKSWAP
        3 CALLDICT
      }> CALLREF
    }> PUSHCONT
    IFJMP
    801842850 PUSHINT
    s3 s-1 PUXC
    EQUAL
    <{
      s1 s3 XCHG
      3 BLKDROP
      s3 POP
      s3 POP
      s4 POP
      s4 POP
      0 PUSHINT
      2339837749 PUSHINT
      s0 s4 XCHG
      NEWC
      256 STU
      ROT
      STSLICER
      s4 s3 s0 XCHG3
      s1 s2 XCHG
      64 PUSHINT
      0 PUSHINT
      16 PUSHINT
      NEWC
      6 STU
      s0 s7 XCHG2
      STSLICER
      s0 s5 XCHG2
      STGRAMS
      s1 s5 XCHG
      107 STU
      s1 s2 XCHG
      32 STU
      64 STU
      s2 PUSH
      ISNULL
      NOT
      <{
        ROT
        STBR
        s0 s1 XCHG
      }> PUSHCONT
      <{
        s2 POP
      }> PUSHCONT
      IFELSE
      s0 s1 XCHG
      ENDC
      s0 s1 XCHG
      SENDRAWMSG
    }> IFJMPREF
    470040874 PUSHINT
    s3 s-1 PUXC
    EQUAL
    <{
      s2 POP
      s4 s8 XCHG
      s3 s7 XCHG
      s2 s6 XCHG
      s4 s5 XCHG
      s0 s2 XCHG
      <{
        s3 s4 XCPU
        SDEQ
        401 THROWIFNOT
        LDMSGADDR
        s1 PUSH
        1 CALLDICT
        LDMSGADDR
        1 LDI
        s1 POP
        LDGRAMS
        10000000 PUSHINT
        s1 s12 XCHG
        SUB
        s1 PUSH
        <{
          s1 s5 PUSH2
          ADD
          SUB
        }> PUSHCONT
        IF
        s2 PUSH
        2 PLDU
        0 NEQINT
        s0 PUSH
        <{
          s0 s6 XCHG
          SUB
        }> PUSHCONT
        <{
          s6 POP
        }> PUSHCONT
        IFELSE
        s0 PUSH
        -1 GTINT
        402 THROWIFNOT
        s1 PUSH
        <{
          1360675939 PUSHINT
          NEWC
          s0 s8 XCHG2
          STSLICER
          s0 s12 XCHG2
          STSLICER
          1 PUSHINT
          s4 PUSH
          s8 s1 s4 XCHG3
          6 8 -1 PUXC2
          0 PUSHINT
          16 PUSHINT
          NEWC
          6 STU
          s0 s7 XCHG2
          STSLICER
          s0 s5 XCHG2
          STGRAMS
          s1 s5 XCHG
          107 STU
          s1 s2 XCHG
          32 STU
          64 STU
          s2 PUSH
          ISNULL
          NOT
          <{
            ROT
            STBR
            s0 s1 XCHG
          }> PUSHCONT
          <{
            s2 POP
          }> PUSHCONT
          IFELSE
          s0 s1 XCHG
          ENDC
          s0 s1 XCHG
          SENDRAWMSG
          s3 s8 XCHG
        }> PUSHCONT
        <{
          s2 s11 XCHG
          s6 POP
          2DROP
        }> PUSHCONT
        IFELSE
        s0 s2 XCHG
        <{
          s7 PUSH
          1 CALLDICT
          3576854235 PUSHINT
          s3 s8 XCHG
          s8 s0 s0 XCHG3
          PUSHNULL
          1 PUSHINT
          0 PUSHINT
          16 PUSHINT
          NEWC
          6 STU
          s0 s7 XCHG2
          STSLICER
          s0 s5 XCHG2
          STGRAMS
          s1 s5 XCHG
          107 STU
          s1 s2 XCHG
          32 STU
          64 STU
          s2 PUSH
          ISNULL
          NOT
          <{
            ROT
            STBR
            s0 s1 XCHG
          }> PUSHCONT
          <{
            s2 POP
          }> PUSHCONT
          IFELSE
          s0 s1 XCHG
          ENDC
          s0 s1 XCHG
          SENDRAWMSG
        }> PUSHCONT
        <{
          s0 POP
          s6 POP
          s0 POP
        }> PUSHCONT
        IFELSE
        1 4 BLKSWAP
        3 CALLDICT
      }> CALLREF
    }> PUSHCONT
    IFJMP
    436968785 PUSHINT
    s3 s-1 PUXC
    EQUAL
    <{
      s7 POP
      2DROP
      s6 POP
      s6 POP
      s3 s1 XCPU
      SDEQ
      410 THROWIFNOT
      s0 s1 XCHG
      LDREF
      s0 POP
      s2 s4 XCHG
      s3 s0 s0 XCHG3
      3 CALLDICT
    }> PUSHCONT
    IFJMP
    s0 s2 XCHG
    1809076275 PUSHINT
    EQUAL
    <{
      s3 s7 PUXC
      SDEQ
      411 THROWIFNOT
      LDMSGADDR
      LDREF
      s0 POP
      CTOS
      s4 s8 XCHG
      s3 s7 XCHG
      s2 s6 XCHG
      s4 s5 XCHG
      s3 s0 s3 XCHG3
      <{
        s3 s6 XCPU
        SDEQ
        401 THROWIFNOT
        LDMSGADDR
        s1 PUSH
        1 CALLDICT
        LDMSGADDR
        1 LDI
        s1 POP
        LDGRAMS
        10000000 PUSHINT
        s1 s12 XCHG
        SUB
        s1 PUSH
        <{
          s1 s5 PUSH2
          ADD
          SUB
        }> PUSHCONT
        IF
        s2 PUSH
        2 PLDU
        0 NEQINT
        s0 PUSH
        <{
          s0 s6 XCHG
          SUB
        }> PUSHCONT
        <{
          s6 POP
        }> PUSHCONT
        IFELSE
        s0 PUSH
        -1 GTINT
        402 THROWIFNOT
        s1 PUSH
        <{
          85167505 PUSHINT
          NEWC
          s0 s10 XCHG2
          STSLICER
          s0 s12 XCHG2
          STSLICER
          1 PUSHINT
          s4 PUSH
          s10 s1 s4 XCHG3
          6 10 -1 PUXC2
          0 PUSHINT
          16 PUSHINT
          NEWC
          6 STU
          s0 s7 XCHG2
          STSLICER
          s0 s5 XCHG2
          STGRAMS
          s1 s5 XCHG
          107 STU
          s1 s2 XCHG
          32 STU
          64 STU
          s2 PUSH
          ISNULL
          NOT
          <{
            ROT
            STBR
            s0 s1 XCHG
          }> PUSHCONT
          <{
            s2 POP
          }> PUSHCONT
          IFELSE
          s0 s1 XCHG
          ENDC
          s0 s1 XCHG
          SENDRAWMSG
          s5 s8 XCHG
        }> PUSHCONT
        <{
          s2 s11 XCHG
          s8 POP
          2DROP
        }> PUSHCONT
        IFELSE
        s0 s2 XCHG
        <{
          s7 PUSH
          1 CALLDICT
          PUSHSLICE
          s2 PUSH
          SDEQ
          <{
            3576854235 PUSHINT
            s3 s8 XCHG
            s5 s0 s0 XCHG3
            PUSHNULL
            1 PUSHINT
            0 PUSHINT
            16 PUSHINT
            NEWC
            6 STU
            s0 s7 XCHG2
            STSLICER
            s0 s5 XCHG2
            STGRAMS
            s1 s5 XCHG
            107 STU
            s1 s2 XCHG
            32 STU
            64 STU
            s2 PUSH
            ISNULL
            NOT
            <{
              ROT
              STBR
              s0 s1 XCHG
            }> PUSHCONT
            <{
              s2 POP
            }> PUSHCONT
            IFELSE
            s0 s1 XCHG
            ENDC
            s0 s1 XCHG
            SENDRAWMSG
          }> PUSHCONT
          <{
            3576854235 PUSHINT
            s3 s8 XCHG
            s5 s0 s0 XCHG3
            PUSHNULL
            7 PUSHPOW2
            0 PUSHINT
            16 PUSHINT
            NEWC
            6 STU
            s0 s7 XCHG2
            STSLICER
            s0 s5 XCHG2
            STGRAMS
            s1 s5 XCHG
            107 STU
            s1 s2 XCHG
            32 STU
            64 STU
            s2 PUSH
            ISNULL
            NOT
            <{
              ROT
              STBR
              s0 s1 XCHG
            }> PUSHCONT
            <{
              s2 POP
            }> PUSHCONT
            IFELSE
            s0 s1 XCHG
            ENDC
            s0 s1 XCHG
            SENDRAWMSG
          }> IFREFELSE
        }> PUSHCONT
        <{
          s0 POP
          s3 POP
          s5 POP
        }> PUSHCONT
        IFELSE
        1 4 BLKSWAP
        3 CALLDICT
      }> CALLREF
    }> PUSHCONT
    IFJMP
    10 BLKDROP
    16 PUSHPOW2DEC
    THROWANY

  1: 
    REWRITESTDADDR
    s0 POP
    0 PUSHINT
    EQUAL
    333 THROWIFNOT

  2: 
    c4 PUSH
    CTOS
    64 LDU
    LDMSGADDR
    s0 PUSH
    SBITS
    0 GTINT
    <{
      -1 PUSHINT
      s0 s1 XCHG
      LDMSGADDR
      LDREF
      LDMSGADDR
      s0 POP
      s3 s5 XCHG
      s3 s4 XCHG
    }> PUSHCONT
    IFJMP
    s0 POP
    0 PUSHINT
    ROTREV
    PUSHNULL
    PUSHNULL
    PUSHNULL

  3: 
    s0 s4 XCHG
    NEWC
    64 STU
    s0 s3 XCHG2
    STSLICER
    s0 s1 XCHG
    STSLICER
    STREF
    s0 s1 XCHG
    STSLICER
    ENDC
    c4 POP

  get_editor: 
    2 CALLDICT
    5 1 BLKDROP2

  get_nft_data: 
    2 CALLDICT
    s0 POP
) 19 DICTPUSHCONST
DICTIGETJMPZ
11 THROWARG
